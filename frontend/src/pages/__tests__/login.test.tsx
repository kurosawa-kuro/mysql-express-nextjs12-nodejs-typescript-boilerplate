// frontend\src\pages\__tests__\login.test.tsx

import React from "react";
import { render, fireEvent, waitFor, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import { rest } from "msw";
import Login from "../login";
import Navbar from "../../components/Navbar";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// MSWの設定: モックサーバのセットアップ
const server = setupServer(
  rest.post("http://localhost:8080/api/auth/login", (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (email === "test@example.com" && password === "password123") {
      return res(
        ctx.status(200),
        ctx.json({
          avatarPath: null,
          createdAt: "2021-07-01T10:00:00Z",
          email: "test@example.com",
          id: 1,
          isAdmin: false,
          name: "Test User",
          updatedAt: "2021-07-01T10:00:00Z",
        })
      );
    }

    return res(ctx.status(403), ctx.json({ message: "Invalid credentials" }));
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe("Login Page", () => {
  it("allows the user to log in successfully", async () => {
    // ルーターのモック
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({
      push: pushMock,
    });

    const { getByLabelText, getByRole } = render(<Login />);

    // メールアドレスとパスワードを入力
    fireEvent.change(getByLabelText(/メールアドレス/i), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(getByLabelText(/パスワード/i), {
      target: { value: "password123" },
    });

    fireEvent.click(getByRole("button", { name: /ログイン/i }));

    await waitFor(() => expect(pushMock).toHaveBeenCalledWith("/"));

    // // Navbar
    // render(<Navbar />);
    // expect(screen.getByText("test@example.com")).toBeInTheDocument();
    // screen.debug();
  });

  it("shows an alert on failed login", async () => {
    const alertMock = jest.spyOn(window, "alert").mockImplementation(jest.fn());

    // Alters the mocked server's behavior to simulate a failed login
    server.use(
      rest.post("http://localhost:8080/api/auth/login", (req, res, ctx) => {
        return res(
          ctx.status(403),
          ctx.json({ message: "Invalid credentials" })
        );
      })
    );

    const { getByLabelText, getByRole } = render(<Login />);

    fireEvent.change(getByLabelText(/メールアドレス/i), {
      target: { value: "wrong@example.com" },
    });
    fireEvent.change(getByLabelText(/パスワード/i), {
      target: { value: "wrongpassword" },
    });

    fireEvent.click(getByRole("button", { name: /ログイン/i }));

    // Wait for the promise to resolve/reject and for the component's state to update
    await waitFor(() =>
      expect(alertMock).toHaveBeenCalledWith("入力内容が正しくありません。")
    );

    alertMock.mockRestore();
  });
});

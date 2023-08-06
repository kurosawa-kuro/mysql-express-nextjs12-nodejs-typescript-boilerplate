// frontend\src\pages\__tests__\login.test.tsx

import React from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { setupServer } from "msw/node";
import { rest } from "msw";
import Login from "../login";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// MSWの設定: モックサーバのセットアップ
const server = setupServer(
  rest.post("http://localhost:8080/api/auth/login", (req, res, ctx) => {
    const { email, password } = req.body as { email: string; password: string };

    if (email === "test@example.com" && password === "password123") {
      return res(ctx.status(200), ctx.json({ token: "fake_token" }));
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
  });
});

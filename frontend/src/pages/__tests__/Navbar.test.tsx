// frontend\src\components\__tests__\Navbar.test.tsx

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Navbar from "../../components/Navbar";
import { useAuthStore } from "@/state/store";

// useAuthStore のモック化
jest.mock("@/state/store", () => ({
  useAuthStore: jest.fn(),
}));

describe("Navbar Component", () => {
  it("should display user's name after successful login", () => {
    // モックを使用して userInfo の状態を設定
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      userInfo: {
        name: "User",
        // 他の必要なプロパティもここに追加できます
      },
      logout: jest.fn(),
    });

    const { getByText } = render(<Navbar />);

    // screen.debug();

    // ユーザー名「User」が表示されることを確認
    expect(getByText("User")).toBeInTheDocument();
  });

  it("should display user's name after successful login", () => {
    // モックを使用して userInfo の状態を設定
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      userInfo: null,
      logout: jest.fn(),
    });

    const { getByText } = render(<Navbar />);

    expect(getByText("ログイン")).toBeInTheDocument();
    expect(getByText("サインアップ")).toBeInTheDocument();
  });

  it("should call the logout function when logout button is clicked", () => {
    const mockLogout = jest.fn();

    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      userInfo: {
        name: "User",
      },
      logout: mockLogout,
    });

    const { getByText } = render(<Navbar />);

    const logoutButton = getByText("ログアウト");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});

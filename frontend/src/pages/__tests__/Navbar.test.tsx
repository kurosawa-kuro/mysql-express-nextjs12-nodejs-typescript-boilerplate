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
  afterEach(() => {
    (useAuthStore as unknown as jest.Mock).mockReset();
  });

  function setup(mockData: any) {
    (useAuthStore as unknown as jest.Mock).mockReturnValue(mockData);
    return render(<Navbar />);
  }

  it("should display user's name after successful login", () => {
    setup({
      userInfo: {
        name: "User",
      },
    });

    expect(screen.getByText("User")).toBeInTheDocument();
  });

  it("should display 'ログイン' and 'サインアップ' when user is not logged in", () => {
    setup({ userInfo: null });

    expect(screen.getByText("ログイン")).toBeInTheDocument();
    expect(screen.getByText("サインアップ")).toBeInTheDocument();
  });

  it("should call the logout function when logout button is clicked", () => {
    const mockLogout = jest.fn();
    setup({
      userInfo: {
        name: "User",
      },
      logout: mockLogout,
    });

    const logoutButton = screen.getByText("ログアウト");
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });
});

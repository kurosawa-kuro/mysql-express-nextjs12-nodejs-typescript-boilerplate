import { act } from "react-dom/test-utils";
import { useAuthStore } from "../../state/store";

// Mock local storage
const localStorageMock = (function () {
  let store: Record<string, any> = {};

  return {
    getItem(key: string) {
      return store[key] || null;
    },
    setItem(key: string, value: any) {
      store[key] = value;
    },
    removeItem(key: string) {
      delete store[key];
    },
    clear() {
      store = {};
    },
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

describe("Auth Store", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("should set user info correctly", () => {
    const sampleUserInfo = {
      avatarPath: null,
      createdAt: "2021-07-01T10:00:00Z",
      email: "test@example.com",
      id: 1,
      isAdmin: false,
      name: "Test User",
      updatedAt: "2021-07-01T10:00:00Z",
    };

    act(() => {
      useAuthStore.getState().setUserInfo(sampleUserInfo);
    });

    const storedUserInfo = JSON.parse(
      localStorage.getItem("userInfo") as string
    );

    expect(storedUserInfo).toEqual(sampleUserInfo);
    expect(useAuthStore.getState().userInfo).toEqual(sampleUserInfo);
  });

  it("should handle logout correctly", () => {
    act(() => {
      useAuthStore.getState().logout();
    });

    expect(localStorage.getItem("userInfo")).toBeNull();
    expect(useAuthStore.getState().userInfo).toBeNull();
  });
});

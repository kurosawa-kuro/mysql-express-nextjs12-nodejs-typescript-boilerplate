// frontend\src\components\Navbar.tsx

import { useAuthStore } from "@/state/store";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Navbar = () => {
  const { userInfo, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <header className="bg-custom-blue-dark p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="font-semibold text-xl">
          <Link href="/">
            <button className="text-2xl font-medium text-white">
              Next.js 12, Express.js and MySQL
            </button>
          </Link>
        </h1>
        <nav>
          <ul className="flex space-x-4">
            {userInfo ? (
              <>
                <span className="bg-white text-custom-blue-dark py-2 px-3 rounded-lg font-medium">
                  {userInfo.name}
                </span>
                <button
                  onClick={logout}
                  className="bg-white text-custom-blue-dark py-2 px-3 rounded-lg font-medium"
                >
                  ログアウト
                </button>
              </>
            ) : (
              <>
                <Link href="/login">
                  <button className="bg-white text-custom-blue-dark py-2 px-3 rounded-lg font-medium">
                    ログイン
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="bg-white text-custom-blue-dark py-2 px-3 rounded-lg font-medium">
                    サインアップ
                  </button>
                </Link>
              </>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;

const base_url = "http://localhost:8000";

export const signupAPI = async (credentials) => {
  const firstName = credentials[0];
  const lastName = credentials[1];
  const email = credentials[2];
  const password = credentials[3];

  const res = await fetch(`${base_url}/customers/signup/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  });

  const data = await res.json();
  if (res.ok) {
    const { access_token, refresh_token } = data;

    localStorage.setItem("access_token", access_token);
    localStorage.setItem("refresh_token", refresh_token);

    return { success: true, message: data.message };
  } else {
    return { success: false, error: data.error };
  }
};

export const loginAPI = async (credentials) => {
  const email = credentials[0];
  const password = credentials[1];

  const res = await fetch(`${base_url}/customers/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  const data = await res.json();

  if (res.ok) {
    localStorage.setItem("access_token", data.access_token);
    localStorage.setItem("refresh_token", data.refresh_token);
  }

  return res;
};

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refresh_token");

  const res = await fetch(`${base_url}/customers/refresh-token/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      refresh_token: refreshToken,
    }),
  });

  const data = await res.json();

  if (data.error === "Invalid refresh token") {
    const res = await fetch(`${base_url}/customers/logout/`, {
      method: "POST",
    });

    window.location.reload();

    if (res.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }
  if (res.ok) {
    localStorage.setItem("access_token", data.access_token);
  }

  return res;
};

export const logoutAPI = async (isLoggedIn) => {
  if (isLoggedIn) {
    const res = await fetch(`${base_url}/customers/logout/`, {
      method: "POST",
    });

    if (res.ok) {
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
    }
  }
};

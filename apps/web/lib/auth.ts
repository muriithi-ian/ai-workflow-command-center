export type DemoRole = "admin" | "reviewer";

export type DemoUser = {
  id: string;
  email: string;
  displayName: string;
  roles: DemoRole[];
};

export type DemoSession = {
  authenticated: boolean;
  mode: "demo";
  user: DemoUser;
};

export function getDemoSession(): DemoSession {
  return {
    authenticated: true,
    mode: "demo",
    user: {
      id: "user_demo_admin",
      email: "demo.admin@example.com",
      displayName: "Demo Admin",
      roles: ["admin", "reviewer"]
    }
  };
}

export function hasRole(user: DemoUser, role: DemoRole): boolean {
  return user.roles.includes(role);
}

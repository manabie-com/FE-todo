export const tokenName = "token";
export const todoDataName = "todos";

export const get = (name: string) => {
  if (name && typeof window !== "undefined") {
    const raw = localStorage.getItem(name);
    if (raw) {
      return JSON.parse(raw);
    }
    return null;
  }
  return null;
};

export const set = (name: string, value: any) => {
  return localStorage.setItem(name, JSON.stringify(value));
};

export const remove = (name: string) => {
  return localStorage.removeItem(name);
};

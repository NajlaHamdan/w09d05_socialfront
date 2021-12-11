const initialState = {
    token: "",
    id: "",
  };
  
  const tokenReducer = (state = initialState, action) => {
    const { type, payload } = action;
    switch (type) {
      case "LOGIN":
        const { token, id } = payload;
        localStorage.setItem("user", token);
        localStorage.setItem("id", id);
        return { token, id };
      case "LOGOUT":
        localStorage.clear();
        return payload;
      default:
        const userTocken = localStorage.getItem("user");
        const userId = localStorage.getItem("id");
        if (userTocken) return { token: userTocken, id: userId };
        return state;
    }
  };
  export default tokenReducer;
  
  export const signIn = (data) => {
    return {
      type: "LOGIN",
      payload: data,
    };
  };
  export const logout = (data) => {
    // this obj is action
    return {
      type: "LOGOUT",
      payload: data,
    };
  };
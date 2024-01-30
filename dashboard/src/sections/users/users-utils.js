export const translateRole = (role) => {
  switch (role) {
    case "USER":
      return "Użytkownik";

    case "BROKER":
      return "Broker";

    default:
      return "Nieznany";
  }
};

export const parseUsernameFromEmail = (email: string): string | null => {
  const regex = /^(.*?)@/;
  const result = email.match(regex);
  if (result && result.length > 1) {
    return result[1];
  }
  return null;
};

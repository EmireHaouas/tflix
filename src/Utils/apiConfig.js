export const getUserLanguage = (profile) => {
  return profile?.language
    ? `${profile.language}-${profile.country || "US"}`
    : "en-US";
};

export const getUserRegion = (profile) => {
  return profile?.country || "US";
};

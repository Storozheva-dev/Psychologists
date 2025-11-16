import { createSelector } from "@reduxjs/toolkit";

export const getPsychologists = (state) => state.psychologists.items;
export const getPsychologistsLoadingStatus = (state) =>
  state.psychologists.isLoading;
export const getPsychologistsError = (state) => state.psychologists.error;

export const getPsychologistsFilter = (state) => state.psychologists.filter;

export const getFilteredPsychologists = createSelector(
  [getPsychologists, getPsychologistsFilter],
  (psychologists, filter) => {
    if (!psychologists) return [];

    switch (filter) {
      case "a-z":
        return [...psychologists].sort((a, b) => a.name.localeCompare(b.name));

      case "z-a":
        return [...psychologists].sort((a, b) => b.name.localeCompare(a.name));

      case "lt150":
        return psychologists.filter((item) => item.price_per_hour < 150);

      case "gt150":
        return psychologists.filter((item) => item.price_per_hour > 150);

      case "popular":
        return [...psychologists].sort((a, b) => b.rating - a.rating);

      case "not-popular":
        return [...psychologists].sort((a, b) => a.rating - b.rating);

      default:
        return psychologists;
    }
  }
);

// айді фейворітс
export const getFavorites = (state) => state.favorites.items;

// псих в фейворітс після фільтру
export const getFavoritePsychologists = createSelector(
  [getFavorites, getFilteredPsychologists],
  (favoriteIds, filteredPsychologists) => {
    if (!filteredPsychologists?.length) return [];
    return filteredPsychologists.filter((p) => favoriteIds.includes(p.id));
  }
);

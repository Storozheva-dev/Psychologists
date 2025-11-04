import { createSelector } from "@reduxjs/toolkit";

export const getPsychologists = (state) => state.psychologists.items;
export const getPsychologistsLoadingStatus = (state) =>
  state.psychologists.isLoading;
export const getPsychologistsError = (state) => state.psychologists.error;

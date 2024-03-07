import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../const';
import { TAppData } from '../../types/state';
import {
  fetchOffersAction,
  toggleFavoriteAction,
  fetchOfferAction,
  fetchCommentsAction,
  fetchNearbyOffersAction,
  postCommentAction,
  fetchFavoriteOffersAction,
} from '../api-actions';

const initialState: TAppData = {
  offers: [],
  isOffersDataLoading: false,
  hasError: false,
  isToggleFavoriteLoading: false,
  offer: {} as TAppData['offer'],
  isOfferDataLoading: false,
  comments: [],
  nearbyOffers: [],
  favoriteOffers: [],
  isCommentDataSending: false,
};

export const appData = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isOffersDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isOffersDataLoading = false;
      })
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isOffersDataLoading = false;
        state.hasError = true;
      })
      .addCase(toggleFavoriteAction.pending, (state) => {
        state.isToggleFavoriteLoading = true;
        state.hasError = false;
      })
      .addCase(toggleFavoriteAction.fulfilled, (state, action) => {
        const { id, isFavorite } = action.payload;

        state.offers = state.offers.map((offer) => {
          if (offer.id === id) {
            return {
              ...offer,
              isFavorite: isFavorite,
            };
          }
          return offer;
        });

        if (state.offer && state.offer.id === id) {
          state.offer.isFavorite = isFavorite;
        }

        const existingIndex = state.favoriteOffers.findIndex(
          (offer) => offer.id === id
        );
        if (existingIndex !== -1) {
          state.favoriteOffers.splice(existingIndex, 1);
        } else {
          state.favoriteOffers.push(action.payload);
        }

        state.isToggleFavoriteLoading = false;
      })

      .addCase(toggleFavoriteAction.rejected, (state) => {
        state.isToggleFavoriteLoading = false;
        state.hasError = true;
      })
      .addCase(fetchOfferAction.pending, (state) => {
        state.isOfferDataLoading = true;
        state.hasError = false;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isOfferDataLoading = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isOfferDataLoading = false;
        state.hasError = true;
      })
      .addCase(fetchCommentsAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(fetchCommentsAction.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.hasError = true;
      })
      .addCase(postCommentAction.pending, (state) => {
        state.isCommentDataSending = true;
        state.hasError = false;
      })
      .addCase(postCommentAction.fulfilled, (state, action) => {
        state.isCommentDataSending = false;
        state.comments.push(action.payload);
      })
      .addCase(postCommentAction.rejected, (state) => {
        state.isCommentDataSending = false;
        state.hasError = true;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.hasError = false;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.hasError = true;
      });
  },
});
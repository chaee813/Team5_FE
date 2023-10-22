import { openBottomSheet } from "../store/slices/bottomSheetSlice";

export function openLoginBottomSheet(dispatch) {
  dispatch(
    openBottomSheet({ bottomSheetType: "loginBottomSheet", isOpen: true }),
  );
}

export function openSeverErrorBottomSheet(dispatch) {
  dispatch(
    openBottomSheet({
      bottomSheetType: "serverErrorBottomSheet",
      isOpen: true,
    }),
  );
}
import React, { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { confirmQuotationDetail } from "../../apis/quotation";
import Button from "../common/atoms/Button";
import BottomSheet from "../common/bottomsheet/BottomSheet";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

const ConfirmOneBottomSheet = ({ onClose, quotationId, chatId }) => {
  const [agreePolicy, setAgreePolicy] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { mutate: confirmQuotationDetailMutate } = useMutation(
    confirmQuotationDetail,
  );
  const queryClient = useQueryClient();

  const handleAgreement = () => {
    setAgreePolicy(!agreePolicy);
  };

  const handleConfirmOne = async () => {
    if (!agreePolicy) return;
    setIsSubmitting(true);
    confirmQuotationDetailMutate(
      { quotationId, chatId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(`/quotations?chatId=${chatId}`);
          setIsSubmitting(false);
          onClose();
        },
        onError: (error) => {
          onClose();
          defaultErrorHandler(error);
          setIsSubmitting(false);
        },
      },
    );
  };

  return (
    <BottomSheet onClose={onClose}>
      <div className="flex flex-col">
        <div className="flex flex-col tracking-tight font-bold text-lg pb-[42px]">
          <span>해당 항목의 결제가 완료되었나요?</span>
          <span>변경 후에는 취소가 불가능합니다.</span>
        </div>
        <div className="pb-[15px]">
          <label htmlFor="policy" className="flex gap-1 items-center px-1">
            <input
              type="checkbox"
              id="policy"
              name="policy-agree"
              checked={agreePolicy}
              onChange={handleAgreement}
              className="w-[14px] h-[14px] rounded-[4px] border-lightgray-sunsu cursor-pointer accent-blue-sunsu"
            />
            <span className="text-xs">
              안내사항을 확인하였으며, 이에 동의합니다.
            </span>
          </label>
        </div>
        <Button
          className={`block w-full h-[50px] rounded-[10px] text-sm ${
            agreePolicy ? "bg-lightskyblue-sunsu" : "bg-zinc-300"
          }`}
          onClick={handleConfirmOne}
          disabled={isSubmitting}
        >
          변경하기
        </Button>
      </div>
    </BottomSheet>
  );
};

export default ConfirmOneBottomSheet;

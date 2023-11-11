import { CircularProgress, Rating } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { createReview } from "../../apis/review";
import { ReactComponent as StarIcon } from "../../assets/star-02.svg";
import { ReactComponent as EmptyStarIcon } from "../../assets/star-03.svg";
import ImageUploadZone from "../common/ImageUploadZone";
import AutoHeightTextarea from "../common/atoms/AutoHeightTextarea";
import Button from "../common/atoms/Button";
import Spinner from "../common/atoms/Spinner";
import useOpenBottomSheet from "../../hooks/useOpenBottomSheet";
import useDefaultErrorHandler from "../../hooks/useDefaultErrorHandler";

export default function ReviewCreateTemplate() {
  const { openBottomSheetHandler } = useOpenBottomSheet();
  const { defaultErrorHandler } = useDefaultErrorHandler();
  const { chatId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const plannerName = searchParams.get("plannerName");
  const [images, setImages] = useState([]);
  const [stars, setStars] = useState(null);
  const heightRef = useRef(null);
  const contentRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false); // login api 호출 중인지 아닌지 확인
  const [isUploading, setIsUploading] = useState(false);

  const handleSubmit = async () => {
    if (stars === null) {
      openBottomSheetHandler({
        bottomSheet: "messageBottomSheet",
        message: "별점을 입력해주세요.",
      });
      return;
    }
    if (contentRef.current.value === "") {
      openBottomSheetHandler({
        bottomSheet: "messageBottomSheet",
        message: "리뷰 내용을 입력해주세요.",
      });
      return;
    }
    if (images.length === 0) {
      openBottomSheetHandler({
        bottomSheet: "messageBottomSheet",
        message: "사진을 등록해주세요.",
      });
      return;
    }
    setIsSubmitting(true);
    try {
      const response = await createReview({
        chatId,
        content: contentRef.current.value,
        stars,
        images,
      });
      if (response.success) {
        openBottomSheetHandler({
          bottomSheet: "routeBottomSheet",
          message: "리뷰가 성공적으로 등록되었습니다.",
        });
      }
    } catch (error) {
      console.log(error);
      defaultErrorHandler(error);
    }
    setIsSubmitting(false);
  };

  useEffect(() => {
    // url 접근 차단
    if (plannerName === null) {
      navigate("/404", { replace: true });
    }
  }, []);

  useEffect(() => {
    const height = heightRef?.current?.offsetHeight;
    if (height < window.innerHeight - 100) {
      heightRef.current.style.height = "calc(100vh - 100px)";
    } else {
      heightRef.current.style.height = "auto";
    }
  }, [images]);

  return (
    <>
      {isUploading && <Spinner />}
      <div
        className="w-full flex flex-col px-[40px] py-[29px] gap-[5px] "
        ref={heightRef}
      >
        <div className="w-full flex flex-col items-center justify-center mt-[20px] mb-[40px]">
          <span className="sm:text-xl text-2xl font-medium mb-[10px]">{`${plannerName} 플래너님은 어땠나요?`}</span>
          <Rating
            value={stars}
            defaultValue={stars}
            precision={1}
            getLabelText={(value) => `${value} Star${value !== 1 ? "s" : ""}`}
            onChange={(event, newValue) => {
              setStars(newValue);
            }}
            icon={<StarIcon className="w-[40px] h-[40px]" />}
            emptyIcon={<EmptyStarIcon className="w-[40px] h-[40px]" />}
            sx={{ gap: "8px" }}
          />
        </div>
        <AutoHeightTextarea
          label="내용을 작성해주세요."
          id="content"
          name="content"
          ref={contentRef}
          rows={7}
        />
        <ImageUploadZone
          images={images}
          setImages={setImages}
          setIsUploading={setIsUploading}
        />
        <div className="grow flex justify-end pt-[10px]">
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="w-full h-[50px] rounded-[10px] font-normal text-sm bg-lightskyblue-sunsu flex justify-center items-center"
          >
            {isSubmitting ? (
              <CircularProgress size={24} />
            ) : (
              <span>등록하기</span>
            )}
          </Button>
        </div>
      </div>
    </>
  );
}

import { useNavigate } from "react-router-dom";
import NoticeItem from "../../../../components/common/NoticeItem/NoticeItem";
import * as style from "./Notice.style";
import PropTypes from "prop-types";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Badge } from "@chakra-ui/react";

const Notice = ({ fetchNoticeData }) => {
  const filteredNoticeData = [...fetchNoticeData].slice(0, 5);

  const settings = {
    infinity: true,
    speed: 1000,
    autoplay: true,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    vertical: true,
    verticalSwiping: true,
  };

  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notice");
  };

  return (
    <>
      <style.NoticeHeader>
        <h1>공지사항</h1>
        <Badge colorScheme="red">New</Badge>
      </style.NoticeHeader>
      <style.NoticeWrap>
        <Slider {...settings} onClick={handleClick}>
          {filteredNoticeData.map((noticeData) => (
            <NoticeItem
              key={noticeData.id}
              noticeDateData={noticeData.date}
              noticeContentData={noticeData.content}
            />
          ))}
        </Slider>
      </style.NoticeWrap>
    </>
  );
};

export default Notice;
Notice.propTypes = {
  noticeData: PropTypes.array,
};

import PropTypes from "prop-types";
import * as style from "./NoticeItem.style";

const NoticeItem = ({ noticeDateData, noticeContentData }) => {
  return (
    <>
      <style.NoticeItem>
        <style.NoticeDate>
          {`${noticeDateData.month}.${noticeDateData.day}`}
        </style.NoticeDate>
        <style.NoticeContent>{noticeContentData}</style.NoticeContent>
      </style.NoticeItem>
    </>
  );
};

export default NoticeItem;

NoticeItem.propTypes = {
  noticeDateData: PropTypes.object,
  noticeContentData: PropTypes.string,
};

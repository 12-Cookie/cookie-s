import { useFireFetch } from '../../hooks/useFireFetch';
import { Badge } from '@chakra-ui/react';

const ScheduleItem = () => {
  const fetch = useFireFetch();
  const schedules = fetch.getData('schedule');

  const handleClick = () => {
    console.log(schedules);
    console.log(schedules);
  };

  const renderStatus = (data) => {
    if (data.status === '모집중') {
      return <Badge>모집중</Badge>;
    } else if (data.status === '모집완료') {
      return <Badge colorScheme="green">모집완료</Badge>;
    }
  };

  return (
    <>
      {schedules.map((data) => (
        <div className="time" key={data.id}>
          <p onClick={handleClick}>
            {`${data.date.month}월 ${data.date.day}일`}
          </p>
          <p>{`${data.time.start} ~ ${data.time.end}`}</p>
          <div>{renderStatus(data)}</div>
        </div>
      ))}
    </>
  );
};

export default ScheduleItem;

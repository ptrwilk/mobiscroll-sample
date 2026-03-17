import { useNavigate, useParams } from "react-router";
import { useCallback } from "react";
import { MbscSelectedDateChangeEvent } from "@mobiscroll/react-next";
import { DateTime } from "luxon";

const useCalendarPageStartDate = () => {
  const navigate = useNavigate();
  const { fromDate } = useParams<{ fromDate: string | undefined }>();

  const onDateChange = useCallback(
    (args: MbscSelectedDateChangeEvent) => {
      const selectedDate = new Date(String(args.date));
      const from = DateTime.fromJSDate(selectedDate).toFormat("yyyy-MM-dd");
      setTimeout(() => navigate(`/schedule/${from}`, { replace: true }));
    },
    [navigate]
  );

  return {
    fromDate,
    onDateChange,
  };
};

export { useCalendarPageStartDate };

import { useNavigate, useParams } from "react-router";
import { useCallback, useState } from "react";
import { MbscSelectedDateChangeEvent } from "@mobiscroll/react-next";
import { DateTime } from "luxon";

const useCalendarPageStartDate = () => {
  const navigate = useNavigate();
  const { fromDate: fromParam } = useParams<{ fromDate: string | undefined }>();
  const fromDate = fromParam || DateTime.fromJSDate(new Date()).toFormat("yyyy-MM-dd");
  const selectedDate = fromParam || new Date();

  const onDateChange = useCallback(
    (args: MbscSelectedDateChangeEvent) => {
      console.log('onDateChange', args);
      const selected = new Date(String(args.date));
      const from = DateTime.fromJSDate(selected).toFormat("yyyy-MM-dd");
      setTimeout(() => navigate(`/schedule/${from}`, { replace: true }));
    },
    [navigate]
  );

  return {
    selectedDate,
    fromDate,
    onDateChange,
  };
};

export { useCalendarPageStartDate };

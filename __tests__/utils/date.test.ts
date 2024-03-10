import { getDateString, getTimeString } from "@/utils/date";

describe("getDateString", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2020-01-01"));
  });

  it("Should return the correct string", () => {
    const dateStringYears = getDateString(new Date("2018-01-01"));
    const dateStringMonths = getDateString(new Date("2019-11-15"));

    expect(dateStringYears).toBe("2 years ago");
    expect(dateStringMonths).toBe("1 month ago");
  });
});

describe("getTimeString", () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2020-01-01"));
  });

  it("Should return the correct string", () => {
    const timeStringYesterday = getTimeString(new Date("2019-12-31T08:30:00"));
    const timeStringDate = getTimeString(new Date("2019-06-16T13:15:00"));

    expect(timeStringYesterday).toBe("yesterday at 8:30");
    expect(timeStringDate).toBe("16.6.2019 13:15");
  });
});

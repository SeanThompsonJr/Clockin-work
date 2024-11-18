interface daysWorked {
  date: string;
  morningHours: number;
  eveningHours: number;
  lateHours: number;
  totalHours: number;
}

export const user = {
  //   name: "sean", add multple users later
  workdays: [
    {
      date: "11-03-2024",
      morningHours: 2,
      eveningHours: 2,
      lateHours: 3,
      totalHours: 9,
    },
    {
      date: "11-04-2024",
      morningHours: 5,
      eveningHours: 5,
      lateHours: 5,
      totalHours: 15,
    },
  ] as daysWorked[],
};

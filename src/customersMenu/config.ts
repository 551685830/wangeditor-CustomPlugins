const genConfig = (): {
  key: number;
  value: string;
  text: string;
}[] => {
  return [
    {
      key: 1,
      value: "#用户姓名#",
      text: "用户姓名"
    },
    {
      key: 2,
      value: "#身份证号#",
      text: "身份证号"
    }
  ];
};

export { genConfig };

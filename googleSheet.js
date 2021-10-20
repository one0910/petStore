const { GoogleSpreadsheet } = require("google-spreadsheet");
const getSheetById = async (id) => {
  const doc = new GoogleSpreadsheet(
    "1id3PwdCf3iuwkzfqzYMmGDHI62asKA6fsAQ_ZBLDNV4"
  );
  doc.useServiceAccountAuth({
    client_email: "id-26-122@my-project-1535965128935.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCv3pUrqkBSvamT\ny2zxRDeceTwgGdDy/wHOuz/8yT29HqaFx6Otbjisz9BJiBenJFss0AW+qmX9OkxX\nBcmFFWqLvyDUUwmxNqGbz0NaeU3vvnIeX07ILadFH+++N2pHNUPkd2z1DzwGcZuj\nQuVZXofQkGQDPeHs8AUdICEKjf8ImytQpRd784DrUDUodYKTwzTTVGjSoQYDDNDm\n0Fm79bMfXs3FC1ZDqIO+P2oGAi6TAb1plxVaxJaPfiPAkMNlkKFz3tWvbfbNrKnN\ngGEWYN46iCJ0enSXVkRgvZ9DK6yWFyWBQlV8wx1SGHBl7quhJ0jSr/7Y/RZJqZIS\nAyboLiExAgMBAAECggEABjoDdWOh1XL3Y+8Tr+LzT4ZSCGQ1B2hJIOs96Wc+dGBu\nLohLag8ySCKdAhKbeKJI2ohH7qVABKej7KSvNAVbID4lWM33ZtiRNiR5HkBzSyAm\ntPpdp19/2MYTcNxQMcmTPtIyn51AEw2du6dHEUW0Iu4zgW6XRwko4AwloHk3eWGU\nAlp3wpgDMUwbZBtk5gC60fNVSvWoMOW1yCOlV4ejLlEGTBejmc/3cL+pU1DPw3zB\nVM89wylQBiy0UvbqWWtRrRjGDvloDZqTXzqpgTcTuJXUXiVK4V8u3HNbphCQLpkG\nSlgeu5hNSwrf7JOhBjt49oCjFPxoFhPP/yzC6P7epQKBgQDVsKFmyQGkCyQHnRY7\nrP42CWaUKz8Az9e89FsFoqJjHHYjSz8OBrx/lqTV67ygg8kUmYqtgo+9aAHKFmCx\n9CwDHvPz3On2ixXG9BfCbTIG0i+s/tYLaB4AZRSPuV/UgDt/L1X54SRerlMX7dFm\nfrvjSpNUZQAoIwseQTYOuIEzdQKBgQDSsO7OQ7PYf85adt7iYQMnat39wjnhE64E\nzB9yaYuQs3n7JC9yds5VVWAag50Ilz1kX6dwNHMNvE2PELt7b8hWhjuDDq8/Rt/E\n86fMCiBD6R5A29VCpkUrCary8J6mE5bXDIYoF4AmAhKCTyUKhHmpqbZJVXCXTLSk\n49kNSlkrTQKBgEon5Kr9wGMENrmpquiErSdldcKfi1qlxhFdnyTCfqX0X4758uTU\nM5/3UDaoeyoc8bADZJu3/lfVeyF9SIsY2BkxKamMFWkodSM42/Ht4Pl7AW6AdRk6\nRYcPjOYfh4EACyWk8KoplmyBBHb+Ybe27U8AN0aHUlmbZ6VVLgRHxRZtAoGACp8w\n6uUu4/NNi/ICOpd5eTtCBdEM6fP8CfHgg/weNSVXOPoSCktDC7pKJgwMlqpJRg4s\netOqGT8tCdFmIkr4ZqRNy8WpwB7qmRtPklHQXpwaElsC3WFUi17pZ2YKGYVTTXQs\nL0lABKqGFFu5Glaja5JKxlewXXBYixeRkcH1zOECgYB7CmGeV3Mkx7l2whvMVmou\nHv732R2UO2VqUBnklIAAE39FN2XlGwk4hGmIkcVzJeSfKA8wXA56QcuHWfbk/vG7\nn+/95EFU4xxRYiBU6Q8yLmXdIhEj4VTE1pEszBEInkTOHfzu+mqBa4BR98k8HCpU\nBJAjRc1B6wn0MjtScL+wZw==\n-----END PRIVATE KEY-----\n"
  });
  await doc.loadInfo();
  return doc.sheetsById[id];
};

exports.signup = async (user, pw) => {
    let main_sheet = await getSheetById(0);
    await main_sheet.loadCells(`A1:A1`);
    let c = main_sheet.getCell(0, 0);
    c.formula = `=match("${user}",member!A:A,0)`;
    await main_sheet.saveUpdatedCells();
    let member_index = c.value;
    let member_sheet = await getSheetById(231250869);
    if (typeof member_index !== "number") {
      await member_sheet.addRows([
          {
              username: user,
              password: pw
            }
        ]);
        return "register done";
    }
    let rows = await member_sheet.getRows({ limit: 1, offset: member_index - 2 });
    let { password } = rows[0];
    if (password === pw) {
        return "login done";
    }
    return "wrong password";
};

const express = require("express");
const app = express();
const port = 8000;

const axios = require("axios");

const fs = require("fs");
const xlsx = require("node-xlsx");
const json2xls = require("json2xls");
const nodeExcel = require("excel-export");

app.get("/exportExcel", (req, res, next) => {
  let params = {
    keywords: "停车",
    city: "beijing",
    output: "json",
    offset: 20,
    page: 1,
    key: "468bb930a18a2453070698ed1055a8f7",
    extensions: "all",
  };

  // let url = `
  // https://restapi.amap.com/v3/place/text?keywords=${encodeURIComponent(
  //   params.keywords
  // )}&city=beijing&output=json&offset=20&page=1&key=468bb930a18a2453070698ed1055a8f7&extensions=all`;

  let codes = [533124, 533123, 533122, 533103, 533102, 533100];
  let fileName = codes[0];
  let conf = {
    rows: [],
  };
  conf.name = "mysheet"; //这里标识在excel底部的表名
  conf.cols = [
    {
      caption: "停车场名称",
      type: "string",
    },
    {
      caption: "地址",
      type: "string",
    },
    {
      caption: "经度",
      type: "string",
    },
    {
      caption: "维度",
      type: "string",
    },
    {
      caption: "编码",
      type: "string",
    },
  ];

  let url = `
  //restapi.amap.com/v3/place/text?key=${params.key}&keywords=${e}&types=&city=云南&children=&offset=100&page=1&extensions=all`;

  axios.get(url).then((response) => {
    response.data.pois.forEach((item) => {
      const { name, cityname, adname, address, location, adcode } = item;
      const lng = location.split(",")[0];
      const lat = location.split(",")[1];
      let lastAddress = cityname + adname + address;
      let arr = [name, lastAddress, lng, lat, adcode];
      conf.rows.push(arr);
    });

    let result = nodeExcel.execute(conf);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats;charset=utf-8"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + encodeURIComponent(fileName) + ".xlsx"
    ); //中文名需要进行url转码
    res.setTimeout(30 * 60 * 1000); //防止网络原因造成超时。
    res.end(result, "binary");
    // res.send({data: response.data})
  });
});

app.get("/", async (req, res, next) => {
  // let codes = [533124, 533123, 533122, 533103, 533102, 533100];
  // 德宏
  // let codes = [533124, 533123, 533122, 533103, 533102];
  // 怒江
  let codes = [533325, 533324, 533323, 533301];
  let confs = [];
  codes.forEach(async (code) => {
    let conf = {
      rows: [],
    };
    conf.name = String(code); //这里标识在excel底部的表名
    conf.cols = [
      {
        caption: "云南省停车场名称",
        type: "string",
      },
      {
        caption: "区域代码",
        type: "string",
      },
      {
        caption: "地磁数量",
        type: "string",
      },
      {
        caption: "经度",
        type: "string",
      },
      {
        caption: "纬度",
        type: "string",
      },
      {
        caption: "备注",
        type: "string",
      },
      {
        caption: "停车场总车位数",
        type: "string",
      },
      {
        caption: "普通车位数",
        type: "string",
      },
      {
        caption: "免费时长(分)",
        type: "string",
      },
      {
        caption: "停车场地址",
        type: "string",
      },
      {
        caption: "备案号",
        type: "string",
      },
      {
        caption: "备案日期（yyyy-MM-dd）",
        type: "string",
      },
      {
        caption: "产权负责单位电话",
        type: "string",
      },
      {
        caption: "产权负责人手机号",
        type: "string",
      },
      {
        caption: "产权负责人姓名",
        type: "string",
      },
      {
        caption: "产权负责人职务",
        type: "string",
      },
      {
        caption: "产权单位",
        type: "string",
      },
      {
        caption: "停车场面积(平米）",
        type: "string",
      },
      {
        caption: "停车场类型 1-露天，2-室内",
        type: "string",
      },
      {
        caption: "地下楼层数",
        type: "string",
      },
      {
        caption: "申请单位",
        type: "string",
      },
      {
        caption: "申请日期(yyyy-MM-dd)",
        type: "string",
      },
      {
        caption: "使用年限（单位年）",
        type: "string",
      },
      {
        caption: "运营单位",
        type: "string",
      },
      {
        caption: "运营单位负责人",
        type: "string",
      },
      {
        caption: "运营单位负责人职务",
        type: "string",
      },
      {
        caption: "运营单位负责人电话",
        type: "string",
      },
      {
        caption: "停车收费方式 1-免费；2-收费； 3-其他",
        type: "string",
      },
      {
        caption: "配备充电桩的停车泊位数量",
        type: "string",
      },
      {
        caption: "停车泊位所属路内或路外属性 1-路内 2-路外",
        type: "string",
      },
      {
        caption: "路外停车泊位所属建筑属性 1-停车库 2-停车场 3-停车楼",
        type: "string",
      },
      {
        caption: "停车资源产权属性   1-机关 2-事业 3-国企 4-私有",
        type: "string",
      },
      {
        caption: "停车场是否是非税   1-是 0-否",
        type: "string",
      },
      {
        caption: "停车场（库）入口数量",
        type: "string",
      },
      {
        caption: "停车场（库）出口数量",
        type: "string",
      },
      {
        caption: "采集设备名称",
        type: "string",
      },
      {
        caption: "位置",
        type: "string",
      },
      {
        caption: "运营时间",
        type: "string",
      },
      {
        caption: "收费标准",
        type: "string",
      },
      {
        caption: "停车场状态 1-运营中 2-已关闭",
        type: "string",
      },
      {
        caption: "人防车位数",
        type: "string",
      },
    ];

    confs.push(
      new Promise((resolve) => {
        getData(code).then((rows) => {
          conf.rows = rows;
          resolve(conf);
        });
      })
    );
  });
  Promise.all(confs).then((lastData) => {
    let fileName = `怒江重新1页`;
    // res.send(lastData);
    let result = nodeExcel.execute(lastData);
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats;charset=utf-8"
    );
    res.setHeader(
      "Content-Disposition",
      "attachment; filename=" + encodeURIComponent(fileName) + ".xlsx"
    ); //中文名需要进行url转码
    res.setTimeout(30 * 60 * 1000); //防止网络原因造成超时。
    res.end(result, "binary");
    // res.send(lastData);
  });

  // res.send("a");

  // console.log("confs", confs);
});

function getData(code) {
  let params = {
    keywords: "停车",
    city: "beijing",
    output: "json",
    offset: 50,
    page: 1,
    key: "468bb930a18a2453070698ed1055a8f7",
    extensions: "all",
  };
  let url = `
  https://restapi.amap.com/v3/place/text?keywords=${encodeURIComponent(
    params.keywords
  )}&city=${code}&output=json&offset=${params.offset}&page=${
    params.page
  }&key=468bb930a18a2453070698ed1055a8f7&extensions=all`;

  return new Promise((resolve) => {
    axios.get(url).then((response) => {
      let rows = [];
      let filterData = response.data.pois.filter(item => !item.name.includes('酒店'))
      filterData.forEach((item, index) => {
        const { name, cityname, adname, address, location, adcode } = item;
        const lng = location.split(",")[0];
        const lat = location.split(",")[1];
        let lastAddress = cityname + adname + address;
        let portNum = String(Math.floor(Math.random() * 100));
        let backNum = String(`${code}000${index}`);
        let phone = String(`159${code}${index}03938`.slice(0, 11));
        let arr = [
          name,
          adcode,
          portNum,
          lng,
          lat,
          "停车泊位",
          portNum,
          portNum,
          "0",
          lastAddress,
          backNum,
          "2021-03-04",
          phone,
          phone,
          "产权负责人",
          "经理",
          "国资公司",
          "1000",
          "1",
          "0",
          "国资公司",
          "2020-12-03",
          "50",
          "运营单位",
          "负责人",
          "经理",
          phone,
          "2",
          "0",
          "1",
          "2",
          "3",
          "1",
          "1",
          "1",
          "暂无",
          lastAddress,
          "全天",
          "3元1小时",
          "1",
          "0",
        ];
        rows.push(arr);
      });
      resolve(rows);
    });
  });
}

// app.get("/", (req, res) => {
//   let url = `
// https://restapi.amap.com/v3/place/text?keywords=%E5%8C%97%E4%BA%AC%E5%A4%A7%E5%AD%A6&city=beijing&output=json&offset=20&page=1&key=468bb930a18a2453070698ed1055a8f7&extensions=all`;

//   axios.get(url).then((result) => {
//     let arr = [];
//     result.data.pois.forEach((item) => {
//       let obj = {
//         地址: item.address,
//         经度: item.location.split(",")[0],
//         纬度: item.location.split(",")[1],
//       };
//       arr.push(obj);
//     });
//     let xls = json2xls(arr);
//     fs.writeFileSync("aa.xlsx", xls, "binary");
//     const dataByParse = xlsx.parse(fs.readFileSync("./test.xlsx"));

//     // /*
//     //    打印出来的数据是一个数组，数组中的每一项（每一个对象）都是一个sheet数据，name属性指定的是每一个sheet的名字
//     //    data属性是一个数组，数组中存放的是表格对应每个sheet的数据，data数组中的第一项是“表头”的数据，也可以理解为是
//     //    第一行的数据，后面的每一项就是对应每一行“表体”的数据，具体格式，后续也会举例。
//     // */
//     // console.log("解析数据格式", dataByParse);

//     // 最后一步，使用xlsx插件自带的build方法将解析后的数据转换成为excel表格（buffer形式的流文件）
//     // 以流文件的形式返回给前端，前端接收解析下载即可
//     res.send(xlsx.build(dataByParse));
//     res.send({
//       status: "0",
//       msg: "success",
//       data: result.data.pois,
//     });
//   });
// });

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

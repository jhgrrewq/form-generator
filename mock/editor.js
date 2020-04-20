
module.exports = {
  'GET /xscommand/customReport/testReport'(req, res) {
    const response = {
      "data": `
      <style type="text/css">
      .excelDefaults {background-color: white;color: black;text-decoration: none;direction: ltr;text-transform: none;text-indent: 0;letter-spacing: 0;word-spacing: 0;white-space: normal;unicode-bidi: normal;vertical-align: 0;text-shadow: none;padding: 0;margin: 0;border-collapse: collapse;white-space: pre-wrap;word-wrap: break-word;word-break: break-all;}.excelDefaults td {padding: 1px 5px;border: 1px solid silver;border-color: #000000;text-align: center;vertical-align: middle;font-size: 12pt;}.excelDefaults .colHeader {background-color: silver;font-weight: bold;border: 1px solid black;text-align: center;padding: 1px 5px;}.excelDefaults .rowHeader {background-color: silver;font-weight: bold;border: 1px solid black;text-align: right;padding: 1px 5px;}.excelDefaults .style_12_124 {
        background-color: #5b9bd5;
        color: #000000;
      }
      .excelDefaults .style_13_124 {
        background-color: #5b9bd5;
        color: #000000;
      }
      .excelDefaults .style_14_124 {
        text-align: left;
        vertical-align: middle;
        color: #000000;
      }
      .excelDefaults .style_15_124 {
        color: #000000;
      }
      .excelDefaults .style_16_124 {
        vertical-align: top;
        color: #000000;
      }
      .excelDefaults .style_17_124 {
        vertical-align: top;
        color: #000000;
      }
      .excelDefaults .style_24_124 {
        vertical-align: top;
        color: #000000;
      }
      .excelDefaults .style_18_124 {
        vertical-align: top;
        color: #000000;
      }
      .excelDefaults .style_19_124 {
        text-align: left;
        vertical-align: middle;
        color: #000000;
      }
      .excelDefaults .style_1a_124 {
        color: #000000;
      }
      .excelDefaults .style_1b_124 {
        vertical-align: top;
        color: #000000;
      }
      .excelDefaults .style_1c_124 {
        vertical-align: top;
        color: #000000;
      }
      .excelDefaults .font_0_124 {
        font-family: 宋体;
        font-size: 11pt;
        color: #000000;
      }
      .excelDefaults .font_1_124 {
        font-family: 等线;
        font-size: 12pt;
        color: #000000;
      }
      .excelDefaults .font_2_124 {
        font-weight: bold;
        font-family: 宋体;
        font-size: 24pt;
        color: #000000;
      }
      .excelDefaults .font_3_124 {
        font-family: 宋体;
        font-size: 14pt;
        color: #000000;
      }
      .excelDefaults .font_4_124 {
        font-family: 仿宋;
        font-size: 11pt;
        color: #000000;
      }
      .excelDefaults .font_5_124 {
        font-weight: bold;
        font-family: 仿宋;
        font-size: 14pt;
        color: #000000;
      }
      .excelDefaults .font_6_124 {
        font-family: 仿宋;
        font-size: 14pt;
        color: #000000;
      }
      .excelDefaults .font_7_124 {
        font-family: 仿宋;
        font-size: 14pt;
        color: #000000;
      }
      .excelDefaults .font_8_124 {
        font-family: 宋体;
        font-size: 14pt;
        color: #000000;
      }
      .excelDefaults .font_9_124 {
        font-family: 宋体;
        font-size: 12pt;
      }
      .excelDefaults .font_10_124 {
        font-family: 宋体;
        font-size: 11pt;
      }
      .excelDefaults .font_11_124 {
        font-family: 宋体;
        font-size: 12pt;
        color: #000000;
      }
      .excelDefaults .font_12_124 {
        font-family: 宋体;
        font-size: 10pt;
      }
      .excelDefaults .font_13_124 {
        font-family: 宋体;
        font-size: 10pt;
      }
      .excelDefaults .font_14_124 {
        font-family: 仿宋;
        font-size: 14pt;
        color: #000000;
      }
      </style>
      <table class='excelDefaults' width='1052'>
      <col style='width:384px;' />
      <col style='width:56px;' />
      <col style='width:254px;' />
      <col style='width:358px;' />
      <tbody>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_12_124 font_5_124'>指标名称</td>
      <td data-key='dw' class='style_12_124 font_5_124'>单位</td>
      <td data-key='z' class='style_12_124 font_5_124'>值</td>
      <td data-key='bz' class='style_13_124 font_5_124'>备注</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>数字经济核心生产业增加值踢重合计值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>75.927982555</td>
      <td data-key='bz' class='style_17_124 font_8_124'>数字经济12月</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>21.5</td>
      <td data-key='bz' class='style_17_124 font_8_124'>数字经济12月</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>农业总产值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>1.88</td>
      <td data-key='bz' class='style_17_124 font_8_124'>农业12月</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>97.955299999999994</td>
      <td data-key='bz' class='style_17_124 font_8_124'>农业12月</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>社会消费品零售总额</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>88.76</td>
      <td data-key='bz' class='style_17_124 font_8_124'>2020年主要经济指标进度数据，1-2月</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>其中：商品零售</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_24_124 font_14_124'   data-type='input'  ></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>其中：商品零售-同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_24_124 font_14_124'   data-type='select'  data-json='[{"id":"1","value":"男"}, {"id":"2","value":"女"}]'  data-id='id'  data-value='value'  ></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>其中：餐饮收入</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_24_124 font_14_124'   data-type='select'  data-url='www.baidu.com'  data-id='id'  data-value='value'  ></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>其中：餐饮收入-同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>地区生产总值累计增速</td>
      <td data-key='dw' class='style_15_124 font_6_124'></td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>地区生产总值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>1847.6598522115801</td>
      <td data-key='bz' class='style_17_124 font_8_124'>地区生产总值</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>地区生产总值-同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>6.3511038299636997</td>
      <td data-key='bz' class='style_17_124 font_8_124'>地区生产总值</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>工业</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>695.75419103757599</td>
      <td data-key='bz' class='style_17_124 font_8_124'>地区生产总值</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>金融业</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>5.7127007313401199</td>
      <td data-key='bz' class='style_17_124 font_8_124'>地区生产总值</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>批发和零售业</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>186.890760078662</td>
      <td data-key='bz' class='style_17_124 font_8_124'>地区生产总值</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>房地产业</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>247.63395872158199</td>
      <td data-key='bz' class='style_17_124 font_8_124'>地区生产总值</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>交通运输、仓储和邮政业</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>76.677977177058494</td>
      <td data-key='bz' class='style_17_124 font_8_124'>地区生产总值</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>建筑业</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>71.155130586445793</td>
      <td data-key='bz' class='style_17_124 font_8_124'>地区生产总值</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>农林牧渔业</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>60.211399999999998</td>
      <td data-key='bz' class='style_17_124 font_8_124'>地区生产总值</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>住宿和餐饮业</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>33.618185089435997</td>
      <td data-key='bz' class='style_17_124 font_8_124'>地区生产总值</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>第一产业生产增加值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>58.29</td>
      <td data-key='bz' class='style_17_124 font_8_124'>杭州交流</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>第一产业生产增加值-同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>1.39</td>
      <td data-key='bz' class='style_17_124 font_8_124'>杭州交流</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>第一产业生产增速</td>
      <td data-key='dw' class='style_15_124 font_6_124'></td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'>杭州交流</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>第二产业生产增加值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>766.67</td>
      <td data-key='bz' class='style_17_124 font_8_124'>杭州交流</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>第二产业生产增加值-同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>5.72</td>
      <td data-key='bz' class='style_17_124 font_8_124'>杭州交流</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>第二产业生产增速</td>
      <td data-key='dw' class='style_15_124 font_6_124'></td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'>杭州交流</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>第三产业生产增加值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>1022.7</td>
      <td data-key='bz' class='style_17_124 font_8_124'>杭州交流</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>第三产业生产增加值-同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>7.3</td>
      <td data-key='bz' class='style_17_124 font_8_124'>杭州交流</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>第三产业生产增速</td>
      <td data-key='dw' class='style_15_124 font_6_124'></td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>萧山区生产总值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>1847.66</td>
      <td data-key='bz' class='style_17_124 font_8_124'>2020年主要经济指标进度数据</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>萧山区生产总值评级</td>
      <td data-key='dw' class='style_15_124 font_6_124'></td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>萧山区生产总值-同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>6.35</td>
      <td data-key='bz' class='style_17_124 font_8_124'>2020年主要经济指标进度数据</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>工业增加值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'>2020年主要经济指标进度数据</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>金融业增加值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>数字经济核心产业增加值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>75.930000000000007</td>
      <td data-key='bz' class='style_17_124 font_8_124'>数字经济</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>数字经济核心产业增加值评级</td>
      <td data-key='dw' class='style_15_124 font_6_124'></td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>数字经济核心产业增加值同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_18_124 font_7_124'>0.215</td>
      <td data-key='bz' class='style_17_124 font_8_124'>数字经济</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>规上数字经济核心产业营业收入</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>居民消费价格指数</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>100.97967975</td>
      <td data-key='bz' class='style_17_124 font_8_124'>价格指数</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>居民消费价格指数环比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>1</td>
      <td data-key='bz' class='style_17_124 font_8_124'>价格指数</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>食品烟酒指数</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>103.85135973</td>
      <td data-key='bz' class='style_17_124 font_8_124'>价格指数</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>医疗保健指数</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>99.945234189999994</td>
      <td data-key='bz' class='style_17_124 font_8_124'>价格指数</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>社会消费品零售总值</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'>88.76</td>
      <td data-key='bz' class='style_17_124 font_8_124'>2020年主要经济指标进度数据</td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>社会消费品零售总值评级</td>
      <td data-key='dw' class='style_15_124 font_6_124'></td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>社会消费品零售总值同比</td>
      <td data-key='dw' class='style_15_124 font_6_124'>%</td>
      <td data-key='z' class='style_16_124 font_7_124'>-23.4</td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:25px;'>
      <td data-key='zbmc' class='style_14_124 font_6_124'>商品零售</td>
      <td data-key='dw' class='style_15_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_16_124 font_7_124'></td>
      <td data-key='bz' class='style_17_124 font_8_124'></td>
        </tr>
      <tr style='height:26px;'>
      <td data-key='zbmc' class='style_19_124 font_6_124'>餐费收入</td>
      <td data-key='dw' class='style_1a_124 font_6_124'>亿元</td>
      <td data-key='z' class='style_1b_124 font_7_124'></td>
      <td data-key='bz' class='style_1c_124 font_8_124'></td>
        </tr>
      </tbody>
      </table>
      `,
      "totals": 0,
      "success": true,
      "code": "200",
      "message": "成功"
    }
    res.json(response)
  }
}

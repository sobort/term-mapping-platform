<style lang="less">
.term-dialog {
  .el-dialog__header {
    padding: 0px;
    background: #f4f4f4;
  }
  .el-dialog__title {
    margin-left: 20px;
  }
  .el-dialog__headerbtn {
    top: 0px;
  }
  .el-dialog__body {
    line-height: 35px;
    padding: 10px 20px;
  }
}
</style>

<template>
  <div class="chart" id="chart">
    <canvas class="can" id="can"></canvas>
    <div class="inner" id="inner">
      <div class="chart-col" v-for="(x,i) in info" :key="i" @click="colClick(x)">
        <div
          class="chart-row"
          v-for="(y,k) in x"
          :key="k"
          :id="'cube-'+y.conceptId"
          @click.right="rowClick(x,y,i,k)"
          @mouseenter="rowEnter(x,y,i,k)"
          @mouseleave="rowLeave(x,y,i,k)"
        >{{y.conceptName}}</div>
      </div>
    </div>
    <div class="term-dialog">
      <el-dialog title="术语修改" :visible.sync="dialogVisible" width="30%">
        <div style="color: #879DEF;">当前名称: {{ termName }}</div>
        <div>
          <span>修订标准名称:</span>
          <el-input v-model="newName" placeholder="请填入标准名称"></el-input>
        </div>
        <div>
          <span>备注：</span>
          <el-input type="textarea" :rows="4" placeholder="请输入备注" v-model="textarea"></el-input>
        </div>
        <div>
          <span>修订记录</span>
          <el-table :data="tableData" :show-header="false">
            <el-table-column prop="beginData"></el-table-column>
            <el-table-column prop="changeName"></el-table-column>
            <el-table-column prop="textarea"></el-table-column>
          </el-table>
        </div>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>
<script>
import * as $ from "jquery";
function draw(context, x0, y0, x1, y1) {
  context.moveTo(x0, y0);
  context.bezierCurveTo(x0 + 15, y0, x1 - 15, y1, x1, y1);
  return context;
}
export default {
  name: "myChart",
  props: ["info"],
  data() {
    return {
      dialogVisible: false,
      termName: "",
      newName: "",
      textarea: "",
      tableData: [
        { beginData: "eerq", changeName: "fefeqefq", textarea: "fqefqe" },
        { beginData: "eerq", changeName: "fefeqefq", textarea: "fqefqe" },
        { beginData: "eerq", changeName: "fefeqefq", textarea: "fqefqe" },
        { beginData: "eerq", changeName: "fefeqefq", textarea: "fqefqe" }
      ]
    };
  },
  methods: {
    colClick(x) {
      console.log(x);
    },
    rowClick(x, y, i, k) {
      this.dialogVisible = true;
      this.termName = y.conceptName;
    },
    rowEnter(x, y, i, k) {
      let currentId = y.conceptId;
      // 高亮当前聚焦节点的所有子节点
      for (const key in this.info) {
        const v = this.info[key];
        v.map(function(m, k) {
          // 遍历父节点数组
          if (m.parentNode) {
            if (m.parentNode.includes(currentId)) {
              let dom = document.getElementById(`cube-${m.conceptId}`);
              dom.style.backgroundColor = "yellowgreen";
            }
          }
        });
      }
      if (y.parentNode) {
        y.parentNode.map(function(v, i) {
          let dom = document.getElementById(`cube-${v}`);
          dom.style.backgroundColor = "pink";
        });
      }
    },
    rowLeave(x, y, i, k) {
      let currentId = y.conceptId;
      // 取消高亮当前聚焦节点的所有子节点
      for (const key in this.info) {
        const v = this.info[key];
        v.map(function(m, k) {
          // 遍历父节点数组
          if (m.parentNode) {
            if (m.parentNode.includes(currentId)) {
              let dom = document.getElementById(`cube-${m.conceptId}`);
              dom.style.backgroundColor = "rgb(153, 204, 255)";
            }
          }
        });
      }
      if (y.parentNode) {
        y.parentNode.map(function(v, i) {
          let dom = document.getElementById(`cube-${v}`);
          dom.style.backgroundColor = "rgb(153, 204, 255)";
        });
      }
    }
  },
  created() {
    this.$nextTick(function() {
      document.getElementById("chart").oncontextmenu = function(e) {
        return false;
      };
      let innerWidth = $("#inner").width();
      let innerHeight = $("#inner").height();
      let canvas = document.getElementById("can");

      canvas.width = Object.keys(this.info).length * 180;
      canvas.height = innerHeight;

      const context = canvas.getContext("2d");
      context.beginPath();
      context.stroke();

      for (const key in this.info) {
        const v = this.info[key];
        v.map(function(m, k) {
          // 获取起点坐标（子级，当前节点）
          let id = `cube-${m.conceptId}`;
          let dom = document.getElementById(id);
          let x0 = dom.offsetLeft;
          let y0 = dom.offsetTop + dom.offsetHeight / 2;

          // 遍历父节点，获取父节点坐标
          if (m.parentNode) {
            m.parentNode.map(function(nodeId, n) {
              let nodedom = document.getElementById(`cube-${nodeId}`);
              let x1 = nodedom.offsetLeft + nodedom.offsetWidth;
              let y1 = nodedom.offsetTop + nodedom.offsetHeight / 2;

              // 连线
              context.beginPath();
              draw(context, x1, y1, x0, y0);
              context.stroke();
            });
          }
        });
      }
    });
  }
};
</script>
<style lang=scss scoped>
.chart {
  display: block;
  .can {
    position: absolute;
    top: 0;
    left: 0;
    z-index: -1;
  }
  .inner {
    width: auto;
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: stretch;
    .chart-col {
      width: 10px !important;
      padding: 10px 30px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      .chart-row {
        width: 10px !important;
        height: 10px;
        border-radius: 8px;
        border: 1px solid #000;
        /* padding: 0px 10px; */
        margin-bottom: 30px;
        cursor: pointer;
        background: #fff;
        font-weight: bold;
      }
    }
  }
}
</style>

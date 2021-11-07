<template>
  <div class="todo">
    <div id="todobox">
      <h1>todos</h1>

      <div class="inpTodo">
        <span class="alldone" @click="allDone">❯</span>
        <input
          id="ipt"
          type="text"
          placeholder="What needs to be done?"
          value=""
          v-model="inpvalue"
          @keyup.enter="addList"
        />
      </div>
      <!-- $emit中的不用传值 -->
      <div class="showlist">
        <p v-for="li in showlist" :key="li._id">
          <input type="checkbox" :checked="li.check" @click="checkclick(li)" />
          {{ li.value }}
          <span class="listX" @click="deletelist(li._id)">x</span>
        </p>
      </div>
      <div class="btnsBox">
        <button plain @click="getTodo()">全部</button>
        <button plain @click="getTodo(true)">已完成</button>
        <button plain @click="getTodo(false)">未完成</button>
        <button plain @click="emptyclick">清除全部</button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import shortId from "shortid";

export default {
  name: "Todo",
  data() {
    return {
      inpvalue: "",
      showlist: [],
    };
  },
  mounted() {
    this.getTodo();
  },
  methods: {
    // 获取数据
    getTodo(check) {
      console.log(check);
      axios
        .get("/todo/getTodo", { params: { check: check } })
        .then((res) => {
          this.showlist = res.data;
        })
        .catch(function (err) {
          console.log(err);
        });
    },
    addList() {
      // 添加
      if (this.inpvalue !== "") {
        axios
          .post("/todo/add", {
            value: this.inpvalue,
            check: false,
            _id: shortId.generate(),
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          });
        this.showlist.push({
          value: this.inpvalue,
          check: false,
          _id: shortId.generate(),
        });
        this.inpvalue = "";
      }
      return;
    },
    // check
    checkclick(i) {
      axios
        .post("/todo/check", i)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.showlist.find((v) => {
        if (v._id == i._id) {
          v.check = !v.check;
        }
        console.log(this.showlist);
      });
    },
    // 删除
    deletelist(i) {
      axios
        .post("/todo/deletei", { id: i })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.showlist = this.showlist.filter((v) => v._id !== i);
    },
    emptyclick() {
      axios
        .post("/todo/empty")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
      this.showlist = "";
    },
    // 全部完成
    allDone() {
      console.log("done!");
      axios
        .post("/todo/alldone")
        .then((res) => {
          console.log(res.data);
        })
        .catch(function (err) {
          // 请求失败处理
          console.log(err);
        });
      this.showlist.forEach((v) => (v.check = true));
    },
  },
};
</script>
<style lang="less" scoped>
.showlist {
  width: 100%;
  height: auto;
  background-color: rgb(156, 156, 156);
  p {
    line-height: 50px;
    background-color: rgb(248, 248, 248);
  }
}

* {
  padding: 0;
  margin: 0;
}
a {
  text-decoration: none;
  color: black;
}
#todobox {
  width: 550px;
  background-color: rgb(255, 255, 255);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  border: 1px solid silver;
  margin-top: 20px;
}
h1 {
  width: 100%;
  font-size: 100px;
  font-weight: 100;
  text-align: center;
}
/* 全部完成span */
.allDone {
  font-size: 30px;
  float: left;
  margin: 0px 15px;
}
.inpTodo {
  width: 100%;
  line-height: 65px;
  margin: 0 auto;
  border-bottom: 1px solid rgb(24, 24, 24);
}
#ipt {
  width: 90%;
  line-height: 60px;
  font-size: 40px;
  border: 0px solid rgb(82, 82, 82);
  outline: none;
  float: left;
  padding: 0px 20px;
}
.showlist {
  text-align: left;
}
p {
  line-height: 70px;
  font-size: 30px;
  /* border: 0px solid rgb(0, 0, 0); */
  border-bottom: 1px solid rgb(117, 117, 117);
}
.listX {
  float: right;
  margin-right: 10px;
}
.btnsBox {
  width: 100%;
  line-height: 50px;
  background-color: rgb(43, 43, 43);
}
</style>

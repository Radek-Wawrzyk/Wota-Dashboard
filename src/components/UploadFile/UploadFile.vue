<template>
  <el-upload
    class="upload-demo"
    :action="this.apiUrl"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    multiple
    :limit="40"
    :on-exceed="handleExceed"
    :file-list="documents"
  >
    <el-button size="small" type="primary">Dodaj nowy plik</el-button>
    <div slot="tip" class="el-upload__tip">Najlepiej dodawać pliki PDF</div>
  </el-upload>
</template>

<script>
import axios from "axios";
import { $API } from "@/main.js";
export default {
  name: "UploadFile",
  data() {
    return {
      apiUrl: `${$API}/documents`,
      documents: [],
      fileList: [
        {
          name: "food.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        },
        {
          name: "food2.jpeg",
          url:
            "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100"
        }
      ]
    };
  },
  methods: {
    async handleRemove(file, fileList) {
      //   console.log(file, fileList);
      console.log(`${$API}/documents/${file.id}`);

      await axios.delete(`${$API}/documents/${file.id}`);
    },
    handlePreview(file) {
      //   console.log(file);
      window.open(`${$API}/doc/${file.name}`, "_blank");
      win.focus();
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `The limit is 40, you selected ${
          files.length
        } files this time, add up to ${files.length + fileList.length} totally`
      );
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`Cancel the transfert of ${file.name} ?`);
    }
  },
  async created() {
    try {
      const documentsData = await axios.get(`${$API}/documents`);
      documentsData.data.forEach(element => {
        this.documents.push({
          id: element._id,
          name: element.documentName,
          url: element.document
        });
      });
    } catch (error) {
      this.$notify({
        title: "Błąd",
        message: "Błąd serwera!",
        type: "error"
      });
    }
  }
};
</script>

<style src="./UploadFile.scss" lang="scss" />
<template>
  <file-pond
    :name="name"
    ref="pond"
    label-idle="Drop files here..."
    v-bind:allow-multiple="false"
    :accepted-file-types="['image/*']"
    v-bind:server="server"
    instant-upload="true"
    :allow-file-size-validation="true"
    max-file-size="1024kb"
    v-on:init="handleFilePondInit"
    v-on:processfile="handleProcessFile"
    v-on:removefile="handleRemoveFile"
    v-on:updatefiles="handleFilePondUpdateFiles"
    :drop-on-page="true"
  />
</template>

<script>
// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond styles
import "filepond/dist/filepond.min.css";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize
);

export default {
  name: "mb-file-upload",
  props: ["name"],
  data: function() {
    return {
      myFiles: [],
      server: {
        // revert: (uniqueFileId, load, error) => {
        //   // no-op
        //   load();
        // },
        process: (
          fieldName,
          file,
          metadata,
          load,
          error,
          progress /*, _abort */
        ) => {
          const cloudName = "mintbean";
          const unsignedUploadPreset = "mintbean-public";

          const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;
          const xhr = new XMLHttpRequest();
          const formData = new FormData();

          xhr.open("POST", url, true);

          xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");

          xhr.upload.addEventListener("progress", e => {
            progress(e.lengthComputable, e.loaded, e.total);
          });

          xhr.onreadystatechange = () => {
            if (xhr.readyState !== 4) {
              return;
            }

            if (xhr.status >= 200 && xhr.status < 300) {
              // HACK:
              // Passing responseText here sets up the file.id as the stringified JSON returned by the server.
              // The right way to do this is to create a filter and set the file property based on the filter.
              // But there isn't any time for that right now, so I'm just setting file.id to be the XHR body.
              load(xhr.responseText);
              return;
            }

            error("oh no!");
          };

          formData.append("upload_preset", unsignedUploadPreset);
          formData.append("tags", "browser_upload");
          formData.append("file", file);
          xhr.send(formData);

          return {
            abort: () => {
              xhr.abort();
            }
          };
        }
      }
    };
  },
  methods: {
    handleFilePondInit: function() {
      // console.log("FilePond has initialized");
      // console.log(this.$refs.pond);
      // FilePond instance methods are available on `this.$refs.pond`
    },
    handleProcessFile: function(error, file) {
      console.log(error, file);
      // debugger;
      // if (error) {
      //   alert('An error occurred while processing the file.');
      //   console.log(error);
      // } else {
      //   this.files.push(file);
      // }
    },
    handleRemoveFile: function(error, file) {
      console.log(error, file);
      // debugger;
      // if (error) {
      //   alert('An error occurred while removingthe file.');
      //   console.log(error);
      // } else {
      //   // dirty way of just removing the file from the array.
      //   // we need to mutate this.files, because it is a prop
      //   let position = -1;
      //   for (let i = 0; i < this.files.length; i++) {
      //     if (this.files[i].id === file.id) {
      //       position = i;
      //       break;
      //     }
      //   }
      //   if (position !== -1) {
      //     this.files.splice(position, 1)
      //   }
      // }
    },
    handleFilePondUpdateFiles: function(files) {
      // debugger;
      this.myFiles = files;
    },
    getFiles() {
      return this.myFiles.map(file => {
        // HACK:
        // Passing responseText here sets up the file.serverId as the stringified JSON returned by the server.
        // The right way to do this is to create a filter and set the file property based on the filter.
        // But there isn't any time for that right now, so I'm just setting file.id to be the XHR body.
        return JSON.parse(file.serverId);
      });
    }
  },
  components: {
    FilePond
  }
};
</script>

<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header" id="modalTitle">
          <slot name="header"> This is the default title! </slot>
          <button
            type="button"
            class="btn-close"
            @click="close"
            aria-label="Close modal"
          >
            x
          </button>
        </header>

        <section class="modal-body" id="modalDescription">
          <slot name="body"> This is the default body! </slot>
        </section>

        <footer class="modal-footer">
          <slot name="footer"></slot>
          <button type="button" class="btn-red" @click="submit" aria-label="Close modal">
            <span class="text-5xl material-icons">delete_forever</span>
          </button>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Modal",
  methods: {
    close() {
      this.$emit("close");
    },
    submit() {
      this.$emit("submit");
    },
  },
};
</script>


<style>
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}

.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
.modal-backdrop {
  z-index: 999;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  transition: 0.3s;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  @apply bg-red-400 hover:bg-red-500
}

.modal-header,
.modal-footer {
  @apply flex-row justify-center p-4 space-x-2;
}

.modal-header {
  position: relative;
  border-bottom: 1px solid #eeeeee;
  color: white;
  justify-content: space-between;
}

.modal-footer {
  flex-direction: column;
  justify-content: center;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
  color: whitesmoke;
}

.btn-close {
  position: absolute;
  top: 0;
  right: 0;
  border: none;
  font-size: 20px;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  color: white;
  background: transparent;
}

.btn-red {
  color: white;
  @apply fill-current text-red-300 hover:text-red-600 ml-12
}
</style>

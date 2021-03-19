<template>
  <div class="main">
    <div class="radio-wrapper">
      <label class="radio" v-for="option in options" :class="[value && value.id === option.id? 'selected': '']" :key="option.id" @change="selectOption(option)">
        <input type="radio" :id="option.id" :value="option.title" :checked="value && value.id === option.id">
        <span>{{ option.title  }}</span>
      </label>
    </div>
  </div>
</template>

<script>
import { Component, Vue, Prop} from "nuxt-property-decorator";

@Component({
})

export default class PublishRadioButton extends Vue{
  @Prop({ type: Array }) options;
  @Prop({ type: Object }) value;

  selected = false;

  selectOption(option) {
    this.$emit('input', option)
  }
}
</script>

<style scoped lang="scss">

@mixin for-laptop {
  @media (min-width: 768px) and (max-width: 1023px) {
    @content;
  }
}
@mixin for-desktop-up {
  @media (min-width: 1200px) {
    @content;
  }
}
@mixin for-big-desktop-up {
  @media (min-width: 1800px) {
    @content;
  }
}
@mixin for-phone-only {
  @media (max-width: 599px) {
    @content;
  }
}

.main {
  display: flex;
  flex-direction: column;
}
.radio-wrapper {
  display: flex;
  flex-direction: row;
  width: 100%;

  @include for-phone-only {
    flex-direction: column;
  }
}



$radioSize: 22px;
$radioBorder: #757B9A;
$radioActive: #757B9A;

.radio {
  display: flex;
  flex: 1;
  height: 50px;
  border: 1px solid #ddd;
  border-radius: 5px;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  margin-right: 12px;
  transition: 0.1s all ease;
  box-sizing: border-box;
  cursor: pointer;
  &:last-child {
    margin-right: 0;
  }
  @include for-phone-only {
    height: 50px;
    min-height: 50px;
    margin-right: 0;
    margin-bottom: 12px;
    font-size: 14px;
  }
  &.selected {
    border: 1px solid #757B9A;
    box-shadow: rgba(0, 0, 0, 0.09) 0px 1px 12px;
    box-sizing: border-box;
    span {
      color: #444;
      font-weight: 500;
    }
  }
  input {
    display: none;
    & + span {
      line-height: $radioSize;
      height: $radioSize;
      display: block;
      position: relative;
      &:not(:empty) {
        padding-left: 0;
      }
      &:before,
      &:after {
        content: '';
        width: $radioSize;
        height: $radioSize;
        display: block;
        border-radius: 50%;
        right: 0;
        top: 0;
        position: absolute;
      }
      &:before {
        background: $radioBorder;
        transition: background .2s ease, transform .4s cubic-bezier(.175, .885, .32, 2);
      }
      &:after {
        background: #fff;
        transform: scale(.78);
        transition: transform .6s cubic-bezier(.175, .885, .32, 1.4);
      }
    }
    &:checked + span {
      &:before {
        transform: scale(1.04);
        background: $radioActive;
      }
      &:after {
        transform: scale(.4);
        transition: transform .3s ease;
      }
    }
  }
  &:hover {
    input {
      & + span {
        &:before {
          transform: scale(.92);
        }
        &:after {
          transform: scale(.74);
        }
      }
      &:checked + span {
        &:after {
          transform: scale(.4);
        }
      }
    }
  }
  span {
    width: 100%;
  }
}
</style>

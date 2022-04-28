import { defineComponent, computed } from 'vue';

import Panel from './components/Panel';
import SelectInput from '../select-input';
import FakeArrow from '../common-components/fake-arrow';
import props from './props';

import { useCascaderContext } from './hooks';
import { CascaderValue } from './interface';
import { useConfig, usePrefixClass, useCommonClassName } from '../hooks/useConfig';

import { closeIconClickEffect, handleRemoveTagEffect } from './core/effect';
import { getPanels, getSingleContent, getMultipleContent } from './core/helper';
import { getFakeArrowIconClass } from './core/className';

export default defineComponent({
  name: 'TCascader',

  props: { ...props },

  setup(props, { slots }) {
    const COMPONENT_NAME = usePrefixClass('cascader');
    const classPrefix = usePrefixClass();
    const { STATUS } = useCommonClassName();
    const overlayClassName = usePrefixClass('cascader__popup');
    const { global } = useConfig('cascader');

    // 拿到全局状态的上下文
    const { cascaderContext } = useCascaderContext(props);

    const displayValue = computed(() =>
      props.multiple ? getMultipleContent(cascaderContext.value) : getSingleContent(cascaderContext.value),
    );

    const panels = computed(() => getPanels(cascaderContext.value.treeNodes));

    const inputPlaceholder = computed(
      () =>
        (cascaderContext.value.visible && !props.multiple && getSingleContent(cascaderContext.value)) ||
        global.value.placeholder,
    );

    const renderSuffixIcon = () => {
      const { visible, disabled } = cascaderContext.value;
      return (
        <FakeArrow
          overlayClassName={getFakeArrowIconClass(classPrefix.value, STATUS.value, cascaderContext.value)}
          isActive={visible}
          disabled={disabled}
        />
      );
    };

    return () => {
      const { setVisible, visible, inputVal, setInputVal } = cascaderContext.value;
      return (
        <SelectInput
          class={COMPONENT_NAME.value}
          value={displayValue.value}
          inputValue={visible ? inputVal : ''}
          popupVisible={visible}
          keys={props.keys}
          allowInput={visible && props.filterable}
          min-collapsed-num={props.minCollapsedNum}
          collapsed-items={props.collapsedItems}
          disabled={props.disabled}
          clearable={props.clearable}
          placeholder={inputPlaceholder.value}
          multiple={props.multiple}
          loading={props.loading}
          overlayClassName={overlayClassName.value}
          suffixIcon={() => renderSuffixIcon()}
          popup-props={{ overlayStyle: panels.value.length && { width: 'auto' } }}
          inputProps={{ size: props.size }}
          onInputChange={(value) => {
            setInputVal(value);
          }}
          onClick={(e: MouseEvent) => {
            setVisible(!visible);
          }}
          onTagChange={(val: CascaderValue, ctx) => {
            handleRemoveTagEffect(cascaderContext.value, ctx.index, props.onRemove);
          }}
          onPopupVisibleChange={(val: boolean, context) => {
            if (context.trigger === 'trigger-element-click' && visible !== val) return;
            setVisible(val);
          }}
          onClear={({ e }) => {
            closeIconClickEffect(cascaderContext.value);
          }}
          v-slots={{
            panel: () => (
              <Panel
                empty={props.empty}
                visible={visible}
                trigger={props.trigger}
                cascaderContext={cascaderContext.value}
                v-slots={{ empty: slots.empty }}
              />
            ),
            collapsedItems: slots.collapsedItems,
          }}
        />
      );
    };
  },
});

# Glass Ledger design context

## Direction

“夜航玻璃账本”：深海蓝画布承托三种可读的信号色（薄荷、蓝紫、珊瑚），玻璃卡片像隔着舷窗读取安静的数据。唯一的视觉冒险是用大面积留白和衬线斜体短语把财务趋势从“报表”拉回“个人计划”。

## Tokens

- Canvas `#08101f`; text `#eef4ff`; muted `#8f9cb2`.
- Glass `rgba(255,255,255,.08–.09)`; border `rgba(255,255,255,.11)`; blur `20px`.
- Signal: mint `#8debd2`, iris `#8aa6ff`, coral `#ffb38a`.
- Radius: 12px controls, 18–22px cards. Hover lift: `2px`.

## Behavior

The three views share one header, one active-nav contract, visible keyboard focus, an always-visible “示例数据” marker, semantic buttons, chart hover/focus details, a table-owned horizontal scroller, and a reduced-motion fallback. All values are synthetic and the UI is a static demo.

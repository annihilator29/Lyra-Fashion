# Page snapshot

```yaml
- generic [active] [ref=e1]:
  - banner [ref=e2]:
    - generic [ref=e3]:
      - link "Lyra Fashion" [ref=e4] [cursor=pointer]:
        - /url: /
        - generic [ref=e5]: Lyra Fashion
      - navigation [ref=e6]:
        - link "Shop" [ref=e7] [cursor=pointer]:
          - /url: /shop
        - link "About" [ref=e8] [cursor=pointer]:
          - /url: /about
        - link "Cart" [ref=e9] [cursor=pointer]:
          - /url: /cart
          - img
          - generic [ref=e10]: Cart
  - main [ref=e11]:
    - generic [ref=e13]:
      - heading "404" [level=1] [ref=e14]
      - heading "This page could not be found." [level=2] [ref=e16]
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e22] [cursor=pointer]:
    - img [ref=e23]
  - alert [ref=e26]
```
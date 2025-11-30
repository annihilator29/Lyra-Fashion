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
    - generic [ref=e13]: Access denied. You must be an admin to view this page.
  - region "Notifications alt+T"
  - button "Open Next.js Dev Tools" [ref=e19] [cursor=pointer]:
    - img [ref=e20]
  - alert [ref=e23]
```
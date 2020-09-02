## Note on Development

You should use the following workflow to build the necessary files to develop on `mutpoint`.

```shell
cd ../mutpoint
npm run build
npm run package
cd ../application-using-mutpoint
npm remove mutpoint
npm install ../mutpoint/mutpoint-0.0.1.tgz
```

# **[Cloudinary](https://cloudinary.com/) Upload Demo**

## **Summary**
Demo application demonstrating different cloudinary image upload methods. 

&nbsp;
## **Upload Methods**
### **Client Side**
> File data is directly uploaded from the client (browser/mobile app) bypassing the backend application server. This method allows for faster uploading and a better user experience. It also reduces load on the backend application server.

#### [Frontend SDK](https://cloudinary.com/documentation/frontend_sdks)
- Frontend SDKs provide convenience wrappers around the upload REST API to simplify use
- Assumes use of a bundler for client application (e.g. webpack, vite)
- JS framework (e.g. Angular, React, Vue) specific component for upload widget

#### [Upload Widget](https://cloudinary.com/documentation/upload_widget)
- Available with pure FE JS using remote script import 
- Cloudinary's upload widget is an interactive, feature rich, simple to integrate method to allow users to upload media files directly to Cloudinary

#### [Backend SDK from Client](https://cloudinary.com/documentation/upload_images#direct_uploading_from_the_browser)
- Assumes use of a bundler for client application (e.g. webpack, vite)
- Use with unsigned upload method (limits number of upload option parameters that can be specified). Unsigned upload options are controlled by an upload preset, in order to use this feature unsigned uploading needs to be enabled for the product environment from the Cloudinary Upload Settings page. 

#### [Direct REST API call](https://cloudinary.com/documentation/upload_images#uploading_with_a_direct_call_to_the_rest_api)
- Available with pure FE JS by specifying the URL
- Can send authenticated on non-authenticated request. For authenticated requests need to first [generate an authentication signature](https://cloudinary.com/documentation/upload_images#generating_authentication_signatures)


### **Server Side**
> File data is first sent to backend application server, done using web form for browser client, and only then uploaded to Cloudinary.

#### [Backend SDK](https://cloudinary.com/documentation/backend_sdks)
- Secure (signed) upload over HTTPS using a secure protocol based on your product environment's `cloud_name`, `api_key` and `api_secret` parameters
- Alternately unsigned upload available without authentication signature



## **Notes**
- [Formidable, Busboy, Multer vs Multiparty](https://bytearcher.com/articles/formidable-vs-busboy-vs-multer-vs-multiparty/)
- [Formidable](https://github.com/node-formidable/formidable)
- [Multer](https://github.com/expressjs/multer)
- [Example: file upload with formidable](https://github.com/Gperry22/cloudinary_formidable/blob/main/server.js)
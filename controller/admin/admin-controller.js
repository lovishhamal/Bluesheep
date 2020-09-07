const router = require('express').Router();
const httpResponse = require('../../http-handler');
const upload = require('../../hepler/multer-file-upload');
const adminService = require('../../services/admin-services');

router.post('/addroom', upload.array('files', 5), async (req, res) => {
  try {
    const parse = JSON.parse(req.body.body);
    const reqFiles = [];

    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push('/images/' + req.files[i].filename);
    }
    parse['images'] = reqFiles;
    const data = await adminService.addRoom(parse);
    httpResponse.successHandler(res, 200, null, data);
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

module.exports = router;

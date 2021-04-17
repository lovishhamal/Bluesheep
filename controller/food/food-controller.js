const router = require('express').Router();
const httpResponse = require('../../http-handler');
const upload = require('../../hepler/multer-file-upload');
const foodService = require('../../services/food-services');

router.post('/', upload.array('files', 5), async (req, res) => {
  try {
    const parse = JSON.parse(req.body.body);
    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push('/images/' + req.files[i].filename);
    }
    parse['images'] = reqFiles;
    const data = await foodService.add(parse);
    httpResponse.successHandler(res, 200, null, null, data);
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

router.get('/', async (req, res) => {
  try {
    const data = await foodService.get();
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 400);
  }
});

router.patch('/:id', upload.array('files', 5), async (req, res) => {
  try {
    const parse = JSON.parse(req.body.body);
    const reqFiles = [];
    for (var i = 0; i < req.files.length; i++) {
      reqFiles.push('/images/' + req.files[i].filename);
    }
    parse['images'] = reqFiles;
    const data = await foodService.update(req.params.id, parse);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 500);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const data = await foodService.deleteFood(req.params.id);
    httpResponse.successHandler(res, 200, data, null, 'success');
  } catch (error) {
    httpResponse.errorHandler(res, error, 500);
  }
});

module.exports = router;

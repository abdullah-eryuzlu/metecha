

with open('./routes/routes.js', 'r') as infile:
  for line in infile.readlines():
    if 'router.get' in line:
      print 'GET ' + line.split("'")[1]
    if 'router.post' in line:
      print 'POST ' + line.split("'")[1]

  infile.close();

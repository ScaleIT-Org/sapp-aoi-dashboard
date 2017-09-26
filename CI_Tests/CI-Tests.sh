if curl dashboard:3000 | grep -q '<title>SICK AOI Data Systems2</title>'; then
  echo "Tests passed!"
  exit 0
else
  echo "Tests failed!"
  exit 1
fi

if [ "$NODE_ENV" == "production" ] ; then
  yarn run prod
else
  yarn run dev
fi
## Git ASR Production - Staging workflow

Add Staging remote url to the ASR portal main repository on your end

```sh
git remote add staging https://github.com/SunbirdAI/ASR-portal-staging.git
```

Make changes from the ASR portal main repository. When ready and want to test
on staging, push to the staging repostory

```sh
git push staging -u branch_name
```

e.g 

```sh
git push staging -u main
```

After confirming that everything works well in staging.
Then we push and deploy in the main ASR portal main repository.

```sh
git push origin -u main
```

Create a github action for building and deploying to github pages for both the main and staging
repositories when a push is made to the main branches.
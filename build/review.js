process.env.VUE_CLI_RELEASE = true

const execa = require('execa')
const inquirer = require('inquirer')

const review = async() => {
  console.log('Code review')
  const { stdout } = await execa('git', ['branch', '-r'])
  const branchList = stdout.split('\n').map(b => b.trim()).map(b => {
    return { "name": b, "value": b }
  })
  const { branch } = await inquirer.prompt([
    {
      name: 'branch',
      message: 'Select release type:',
      type: 'list',
      choices: branchList
    }
  ])

  const { yes } = await inquirer.prompt([{
    name: 'yes',
    message: `Confirm review ${branch}?`,
    type: 'confirm'
  }])
  if (yes) {
    const localBranch = branch.replace(/^origin\//, '')

    console.log('> 1. switched to develop branch')
    console.log('')
    // 切换到 develop 分支
    await execa('git', ['checkout', 'develop']).stdout.pipe(process.stdout)

    console.log('> 2. pull develop branch')
    console.log('')
    // 拉取最新的 develop 分支
    await execa('git', ['pull', 'origin', 'develop']).stdout.pipe(process.stdout)
    try {
      // 拉取要 code review 的分支到本地
      await execa('git', ['checkout', '-b', `${localBranch}`, `${branch}`])
    } catch (error) {
      if (error.message && error.message.includes('already exists')) {
        console.log(`A branch named '${localBranch}' already exists!!!`)
        await execa('git', ['pull', 'origin', `${localBranch}`]).stdout.pipe(process.stdout)
      } else {
        throw error
      }
    }

    console.log(`> 3. Merge develop to ${localBranch}`)
    console.log('')
    // 合并最新 develop 到要 code review 的分支
    await execa('git', ['merge', 'develop', `${localBranch}`]).stdout.pipe(process.stdout)

    console.log(`> 4. Show diff file name`)
    console.log('')
    // 比较 develop 和要 code review 的分支不同的文件
    await execa('git', ['diff', 'develop', `${localBranch}`, '--name-only']).stdout.pipe(process.stdout)
    console.log("Branch clone complete！！！")
  }
}

review().catch(err => {
  console.error(err)
  process.exit(1)
})

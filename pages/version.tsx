// TODO: Remove this page for production
import VersionInfo from 'constants/GitProperties.json'
import React from 'react'

const Version = () => {
    return (
        <div>
            <pre>
                <p>git.build.time: {VersionInfo['git.build.time']}</p>
                <p>git.build.version: {VersionInfo['git.build.version']}</p>
                <p>git.commit.id.abbrev: {VersionInfo['git.commit.id.abbrev']}</p>
                <p>git.commit.message.full: {VersionInfo['git.commit.message.full']}</p>
                <p>git.commit.time: {VersionInfo['git.commit.time']}</p>
                <p>git.commit.user.name: {VersionInfo['git.commit.user.name']}</p>
                <p>git.total.commit.count: {VersionInfo['git.total.commit.count']}</p>
            </pre>
        </div>
    )
}

export default Version

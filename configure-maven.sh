#!/bin/bash

sed -i~ "/<servers>/ a\
<server>\
  <id>private-repo</id>\
  <username></username>\
  <password></password>\
</server>" /usr/share/maven/conf/settings.xml

sed -i "/<profiles>/ a\
<profile>\
  <id>private-repo</id>\
  <activation>\
    <activeByDefault>true</activeByDefault>\
  </activation>\
  <repositories>\
    <repository>\
      <id>private-repo</id>\
      <url>http://nexus.stiltsoft.com/nexus/content/groups/atlassian/</url>\
    </repository>\
  </repositories>\
  <pluginRepositories>\
    <pluginRepository>\
      <id>private-repo</id>\
      <url>http://nexus.stiltsoft.com/nexus/content/groups/atlassian/</url>\
    </pluginRepository>\
  </pluginRepositories>\
</profile>" /usr/share/maven/conf/settings.xml
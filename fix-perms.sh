sudo find . -type f -exec chmod 664 {} \;
sudo find . -type d -exec chmod 775 {} \;
sudo chown -R 1000:100999 .
find . -wholename "*/bin/*" -type f -not -regex '.*\(php\|bat\|exe\)$' -exec chmod +x {} \;
chmod +x ./sail
chmod +x ./fix-perms.sh


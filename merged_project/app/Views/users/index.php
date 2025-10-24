<?php if(empty($users)): ?>
  <p>Nenhum usuário.</p>
<?php else: ?>
  <?php foreach($users as $u): ?>
    <div class="card"><strong><?=htmlspecialchars($u['name'])?></strong> — <?=htmlspecialchars($u['email'])?></div>
  <?php endforeach; ?>
<?php endif; ?>

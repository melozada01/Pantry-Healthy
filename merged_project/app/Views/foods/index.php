<div class="card">
  <a href="/foods/create">Criar novo alimento</a>
</div>
<?php if(empty($foods)): ?>
  <p>Nenhum alimento cadastrado.</p>
<?php else: ?>
  <?php foreach($foods as $f): ?>
    <div class="card">
      <strong><?=htmlspecialchars($f['name'])?></strong><br>
      Calorias: <?=htmlspecialchars($f['calories'])?> — Proteína: <?=htmlspecialchars($f['protein'])?> g<br>
    </div>
  <?php endforeach; ?>
<?php endif; ?>

/**
 * LP 公式料金（表示用の単一設定）
 *
 * 月額は src/lib/billing/plans.ts の regularYen（公式リリース価格）と同期してください。
 * 対象人数は LP 掲載用の区分です（管理者を含む利用人数の目安）。
 * Pro の上限を超える場合は LP 上で問い合わせへ誘導します（11名規模以上は Business 以降）。
 */
window.LP_OFFICIAL_PRICING = {
  taxLabel: '税込',
  proStaffMaxLabel: '10名まで',
  plans: [
    {
      key: 'solo',
      name: 'Solo',
      staffLabel: '1名',
      monthlyYen: 1980,
      blurb: 'ひとりで使い始めたい方向け',
    },
    {
      key: 'starter',
      name: 'Starter',
      staffLabel: '2〜5名',
      monthlyYen: 4980,
      blurb: '少人数のチーム向け',
    },
    {
      key: 'pro',
      name: 'Pro',
      staffLabel: '6〜10名',
      monthlyYen: 9980,
      blurb: 'スタッフの多いチーム向け',
    },
  ],
};
